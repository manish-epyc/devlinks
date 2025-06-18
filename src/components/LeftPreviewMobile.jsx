import ArrowIcon from "../assets/arrow.svg";

function LeftPreviewMobile(props) {
  const links = props.links;
  const platforms = props.platforms;
  const profile = props.profile;

  const profileName = `${profile.firstName} ${profile.lastName}`.trim();
  const profileEmail = profile.email;
  const profileImage = profile.image;

  return (
    <div className="max-w-80 w-full min-h-[600px] mx-auto border-8 border-gray-300 rounded-[2.5rem] bg-white shadow-xl p-6 flex flex-col items-center">
      {profileImage ? (
        <img
          src={profileImage}
          className="w-20 h-20 rounded-full object-cover mb-6"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-6" />
      )}

      {profileName ? (
        <p className="font-semibold mb-2">{profileName}</p>
      ) : (
        <p className="font-semibold w-full rounded-xl bg-gray-200 h-6 mb-2"></p>
      )}

      {profileEmail ? (
        <p className="font-semibold mb-8">{profileEmail}</p>
      ) : (
        <p className="font-semibold w-1/2 rounded-xl bg-gray-200 h-6 mb-6"></p>
      )}

      {links.map((link) => {
        const platform = platforms.find((p) => p.name === link.platform);

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`w-full text-white text-sm font-medium text-center py-3 rounded-lg mb-5 flex items-center gap-2 justify-between px-3 ${platform?.color}`}
          >
            <span className="flex items-center gap-2">
              <img src={platform?.icon} className="w-5 h-5" />
              {platform?.name}
            </span>

            <span>
              <img src={ArrowIcon} className="w-3 h-3" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default LeftPreviewMobile;
