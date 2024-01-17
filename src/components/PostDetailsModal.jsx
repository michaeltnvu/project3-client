// import { Button, Label, Modal, TextInput } from "flowbite-react";
// import { useContext, useState, useEffect } from "react";
// import PostContext from "../context/post.context";

// function PostDetails({ openModal, setOpenModal, selectedPost }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     // Check if selectedPost is defined and has the 'comments' property
//     if (selectedPost && selectedPost.comments) {
//       setComments(selectedPost.comments);
//     }
//   }, [selectedPost]);

//   const handleNewCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() !== "") {
//       setComments((prevComments) => [...prevComments, newComment]);
//       setNewComment("");
//     }
//   };

//   const onCloseModal = () => {
//     setOpenModal(false);
//   };

  

//   return (
//     <>
//       <Modal show={openModal} size="md" onClose={onCloseModal} dismissible popup>
//         <Modal.Header />
//         <Modal.Body>
//           <div>
//             <h3 className="text-xl font-medium text-gray-900 dark:text-white">
//               View Post
//             </h3>

//             <div>
//               <img src={selectedPost.url} alt="Post" className="mb-2" />
//             </div>

//             <div>
//               <div className="Country mb-2 block">
//                 <Label htmlFor="location" value="Location" />
//               </div>
//               <TextInput
//                 id="location"
//                 value={selectedPost.location}
//                 readOnly
//               />
//             </div>

//             <div>
//               <div className="Caption mb-2 block">
//                 <Label htmlFor="caption" value="Caption" />
//               </div>
//               <TextInput
//                 id="caption"
//                 value={selectedPost.caption}
//                 readOnly
//               />
//             </div>

//             <div>
//               <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                 Comments
//               </h4>
//               <ul>
//                 {comments.map((comment, index) => (
//                   <li key={index} className="mb-1">
//                     {comment}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <div className="Comment mb-2 block">
//                 <Label htmlFor="newComment" value="Add Comment" />
//               </div>
//               <TextInput
//                 id="newComment"
//                 onChange={handleNewCommentChange}
//                 value={newComment}
//               />
//             </div>

//             <div className="w-full">
//               <Button className="text-black" onClick={handleAddComment}>
//                 Add Comment
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default PostDetails;