interface SocialIconProps {
  url: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  id: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  url,
  icon,
  title,
  color,
  id,
}) => (
  <div
    className="flex justify-center items-center rounded-sm size-8 md:size-9 animate-fade transition-colors duration-1000"
    style={{ backgroundColor: color }}
  >
    <a
      id={id}
      className="text-white"
      href={url}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  </div>
);
