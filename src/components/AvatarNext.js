// create avatar component with antd and image next

const { default: Image } = require("next/image");

const AvatarNext = ({ src, alt, ...props }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={300}
            height={300}
            style={{ borderRadius: 8 }}
        />
    );
};

export default AvatarNext;
