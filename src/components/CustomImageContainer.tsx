import { useEffect, useState } from "react";
import { PostImageProps } from "../../types";

const CustomImageContainer: React.FC<PostImageProps> = ({ images }) => {

    const [imageContainerStyles, setStyles] = useState("post-image my-3 grid gap-2");
    const [imageStyles, setImageStyles] = useState("rounded-md row-span-2 h-auto w-full object-cover");

    useEffect(() => {
        if (images?.length == 2) {
            setStyles("post-image my-5 grid grid-cols-2 gap-2")
            setImageStyles("row-span-2 h-full object-cover aspect-square")
        } else if (images?.length == 3) {
            setStyles("post-image my-5 grid grid-cols-2 gap-2")
            setImageStyles("rounded-md object-cover aspect-square")
        } else if (images?.length == 4) {
            setStyles("post-image my-5 grid grid-cols-2 gap-2")
            setImageStyles("rounded-md object-cover aspect-square")
        }else if (images && images?.length >= 5) {
            setStyles("post-image my-5 grid grid-cols-2 gap-2")
            setImageStyles("rounded-md object-cover aspect-square")
        }
    }, [])

  return (
    <div className={imageContainerStyles}>
    {/* map through the images */}

    {images && images.map((image: { url: string; public_id: string; fileName: string }, i: number ) => {
        const numberOfExcessImages: number = images.length - 3;

        //if images are over 5 just hide them
        //i still need them to render on the dom so that i can access it 
        //that is why i still render them
        if(images?.length >= 5 && i >= 4) {
            return(
                <img  
                src={image.url}
                alt={image.fileName}
                className={"hidden"}/>
            )
        }
        //if images are 5 or more
        if(images?.length >= 5 && i == 3) {
            return(
                <div className="w-full h-full relative overflow-hidden " key={i}>
                <span className="w-full h-full bg-black opacity-55 z-20 absolute rounded-md"></span>
                <p className="text-white z-20 absolute text-3xl top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">+{numberOfExcessImages}</p>
                <img  
                src={image.url}
                alt={image.fileName}
                className={imageStyles}/>
                </div>
            )
        }
        //if the images are 3
        if(images?.length == 3 && i == 0) {
            return(
            <img
            key={i}
            src={image.url}
            alt={image.fileName}
            className={"rounded-md row-span-2 h-full object-cover"}/>
            )
        }
        //default return
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
