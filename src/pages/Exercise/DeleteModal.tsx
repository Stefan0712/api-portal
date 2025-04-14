
import React from "react";


interface DeleteModalProps{
    confirm: ()=> void;
    cancel: ()=> void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({confirm, cancel}) => {
    return ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-black p-6 rounded-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4 text-white">Are you sure you want to delete this exercise?</p>
            <div className="flex justify-end gap-2">
                <button onClick={cancel} className="px-4 py-2 text-white border rounded" > Cancel </button>
                <button onClick={confirm} className="px-4 py-2 bg-red-500 text-white rounded" > Delete </button>
            </div>
            </div>
        </div>
     );
}
 
export default DeleteModal;