import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { CSS } from "@dnd-kit/utilities";
import Header from "./Header";
import { useFormData } from "../context/FormDataContext";
import LeftPreviewMobile from "./LeftPreviewMobile";
import { useNavigate } from "react-router-dom";
import { platforms } from "./GetIconByName";
import { useForm } from "react-hook-form";

const generateId = () => uuidv4();

function SortableLinkItem({
  id,
  link,
  onChange,
  onRemove,
  register,
  error,
  index,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 p-4 border rounded-md bg-white shadow"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Link #{index + 1}</h2>
        <button onClick={() => onRemove(id)} className="text-red-500 text-sm">
          Remove
        </button>
      </div>

      <select
        className="border p-2 rounded mt-2 w-full"
        value={link.platform}
        onChange={(e) => onChange(id, "platform", e.target.value)}
      >
        {platforms.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        className={`border p-2 rounded mt-2 w-full outline-0 ${
          error ? "border-red-500" : ""
        }`}
        placeholder="Enter link"
        value={link.url}
        {...register(`url_${id}`, {
          required: "Link is required",
          pattern: {
            value:
              /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
            message: "Enter a valid URL",
          },
          onChange: (e) => onChange(id, "url", e.target.value),
        })}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      <button
        {...attributes}
        {...listeners}
        className="text-xs text-gray-400 mt-2 cursor-move"
      >
        Drag
      </button>
    </div>
  );
}

function Link() {
  const { links, setLinks, profile } = useFormData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const addNewLink = () => {
    setLinks([
      ...links,
      {
        id: generateId(),
        platform: "GitHub",
        url: "",
        index: links.length,
      },
    ]);
  };

  const updateLink = (id, key, value) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [key]: value } : link))
    );
  };

  const removeLink = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = links.findIndex((i) => i.id === active.id);
      const newIndex = links.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(links, oldIndex, newIndex).map(
        (link, idx) => ({ ...link, index: idx })
      );
      setLinks(reordered);
    }
  };

  const onSubmit = async () => {
    const isValid = await trigger();
    const hasEmptyUrls = links.some((link) => !link.url.trim());

    if (!isValid || hasEmptyUrls) return;
    navigate("/profile-details");
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[1280px] mx-auto">
      <Header Page="link" />
      <div className="flex flex-grow flex-col lg:flex-row p-6 gap-6">
        <div className="lg:w-2/5 bg-white rounded-lg p-6">
          <LeftPreviewMobile
            links={links}
            platforms={platforms}
            profile={profile}
          />
        </div>

        <div className="lg:w-3/5 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Customize your links
          </h1>
          <p className="text-gray-500 mb-6">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button
            onClick={addNewLink}
            className="w-full border border-purple-600 text-purple-600 font-semibold py-2.5 px-4 rounded-md hover:bg-purple-50 transition duration-200 mb-6"
          >
            ＋ Add new link
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={links.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
              >
                {links.map((link, index) => (
                  <SortableLinkItem
                    key={link.id}
                    id={link.id}
                    link={link}
                    index={index}
                    onChange={updateLink}
                    onRemove={removeLink}
                    register={register}
                    error={errors[`url_${link.id}`] || null}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {links.length > 0 && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border bg-purple-600 text-white font-semibold py-2.5 rounded-md hover:bg-purple-50 hover:text-purple-600 transition duration-200 mb-6 px-8 flex justify-end mt-12"
                >
                  Next
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Link;
