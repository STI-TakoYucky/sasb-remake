import React from "react";

export default function PostList() {
  return (
    <div className="flex items-center justify-center bg-slate-100">
      <div>
        <img></img>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam velit
          error, labore quae quam dignissimos asperiores nobis nostrum voluptas,
          laudantium architecto quidem iure similique fugit mollitia optio quas
          saepe libero.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button className="btn btn-success">Success</button>
        <button className="btn btn-error">Error</button>
      </div>
    </div>
  );
}
