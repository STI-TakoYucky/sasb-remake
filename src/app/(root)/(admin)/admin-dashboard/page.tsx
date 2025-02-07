'use client'

import { Navbar } from "@/components";
import { PostPageForm, PostList } from "@/components/adminComponents";
import { useState } from "react";

const AdminDashboard = () => {
  const [navActive, setNavActive] = useState<{ link: string; "x-pos": number; width: number }>({
      link: "Create Post",
      "x-pos": 20,
      width: 109
    });

    const NavigationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      console.log(target.offsetWidth)
      if (target.tagName === "LI") {
        setNavActive({
          link: target.innerHTML,
          "x-pos": target.getBoundingClientRect().x,
          width: target.offsetWidth
        });
      }
    };

  return (
    <>
    <Navbar></Navbar>
      <main className="py-28 global-mx">
        <div className="mt-3 mb-5 flex items-center" onClick={NavigationHandler}>
          <span className="bg-primary-200 absolute h-8 rounded-full transition-all duration-500" style={{ left: `${navActive["x-pos"]}px`, width: `${navActive["width"]}px`}}></span>
          <ul className="navigation__container flex items-center gap-3">
            <li>Create Post</li>
            <li>Post List</li>
          </ul>
        </div>
        <section className="">
          {
            navActive.link == "Create Post" && <PostPageForm></PostPageForm>
          }
          {
            navActive.link == "Post List" && <PostList></PostList>
          }
          
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
