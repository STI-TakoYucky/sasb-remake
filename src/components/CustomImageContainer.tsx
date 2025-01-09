import { useEffect, useState } from "react";
import { PostImageProps } from "../../types";

const CustomImageContainer: React.FC<PostImageProps> = ({ images }) => {

    const [imageContainerStyles, setStyles] = useState("post-image my-5 grid gap-2");
    const [imageStyles, setImageStyles] = useState("rounded-md row-span-2 h-auto w-full object-cover");

    useEffect(() => {
        if (images?.length == 2) {
            setStyles("post-image my-5 grid grid-cols-2 gap-2")
            setImageStyles("rounded-md row-span-2 h-full object-cover aspect-square")
        }
    }, [])

  return (
    <div className={imageContainerStyles}>
    {/* map through the images */}

    {images && images.map((image: { url: string; public_id: string; fileName: string }, i: number ) => {
        return(
            <img
            key={i}
            src={image.url}
            alt={image.fileName}
            className={imageStyles}/>
        )
    }
    )}
    </div>
  );
};

export default CustomImageContainer;
