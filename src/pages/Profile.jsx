import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="user-profile flex flex-col items-center justify-center">
      {user && (
        <div>
          <div className="user-banner ">
            <img src={user.bannerImage} alt="banner image" />
            <div className="">
              <img src={user.profileImage} alt="profile image" />
            </div>
          </div>
          <div className="user-info bg-gray-500">
            <div className="user-name flex gap-20">
              {`${user.firstName} ${user.lastName}`}
              <div>{user.posts.length} Posts</div>
              <div>{user.followers.length} Followers</div>
              <div>{user.following.length} Following</div>
            </div>
            <div className="user-handle">@{user.username}</div>
            <div className="user-bio mt-5">
              Hi, my name is {user.firstName}!
            </div>
          </div>

          <div className="flex flex-row gap-4 w-[25vw]">
            {user.posts.map((post) => (
              <img key={post._id} src={post.media[0].url} alt="post images" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
