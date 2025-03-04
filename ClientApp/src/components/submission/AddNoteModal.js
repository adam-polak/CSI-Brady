import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import Product from "../product/Product";

export function AddNoteModal({ changeAddedProduct, areaId, product, isFromCamera }) {
    const [modal, setModal] = useState(false);
    const [p, setProduct] = useState(product);
    const [noteText, setNoteText] = useState(p.Note || "");

    const toggle = () => setModal(!modal);

    const handleChange = (e) => {
        setNoteText(e.value);
    }
    
    async function save() {
        const noteText = document.getElementById("note-text");
        const text = noteText.value;

        if(!isFromCamera) {
            await fetch(`/areaapi/note/append/${areaId}/${product.Id}`, {
                method: "POST",
                body: text
            });
        }

        product.Note = text;
        setProduct(product);
        setNoteText(text);

        if(isFromCamera) {
            changeAddedProduct(product);
        }

        toggle();
    }

    return (
        <div>
            <button
            onClick={() => toggle()}
            color="primary"
            className="btn"
            >
            <img
                width="40px"
                height="40px"
                alt="add note"
                src="add-note.svg"
            />
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody style={{maxHeight: "90vh", overflowY: "scroll"}}>
                    <Product product={p} />
                    <h3 className="text-center">Notes</h3>
                    <textarea id="note-text" className="bg-grey mb-3 p-2" onChange={handleChange} value={noteText} style={{height: "50vh", width: "100%"}} />
                    <div className="d-flex justify-content-end px-4">
                        <button onClick={() => save()} className="btn btn-success">Save</button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}