'use client'

import { AdminNavbar, PostPageForm, PostList } from "@/components/adminComponents";
import { useState } from "react";

const AdminDashboard = () => {
  const [navActive, setNavActive] = useState<{ link: string; "y-pos": number }>({
      link: "Create Post",
      "y-pos": 124 - 90,
    });

    
  return (
    <>
      <AdminNavbar navActive={navActive} setNavActive={setNavActive}></AdminNavbar>
      <main className="py-28">
        <section className="global-mx">
          <h1 className="text-3xl font-bold uppercase mb-6">Create post</h1>
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
