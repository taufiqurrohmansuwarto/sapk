// create avatar component with antd and image next

import Image from "next/image";

const AvatarNext = ({ src, alt, ...props }) => {
    return (
        <Image
            src={src}
            // contains="fill"
            width={80}
            height={80}
            style={{ borderRadius: 8 }}
            loading="lazy"
        />
    );
};

export default AvatarNext;
