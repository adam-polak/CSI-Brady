import { useState } from "react";
import { Card } from "reactstrap";
import Product from "../product/Product";
import { useNavigate } from "react-router-dom";
import ImageIcon from "../icons/ImageIcon";

export function AreaProduct({ areaId, product }) {
    const nav = useNavigate();
    const [count, setCount] = useState(product.Count);
    const [inputText, setInputText] = useState(false);
    const [note, setNote] = useState(product.Note || "");

    async function add() {
        setCount(count + 1);

        await fetch(`/productapi/increment/${areaId}/${product.Id}`, { method: "POST" });
    }

    async function subtract() {
        const nCount = count - 1;
        if(nCount === 0) {
            // TODO
            // are you sure you want to delete?
            return;
        }

        setCount(count -1);

        await fetch(`/productapi/decrement/${areaId}/${product.Id}`, { method: "POST" });
    }

    const handleChange = (e) => {
        setNote(e.target.value);
    }

    async function save() {
        await fetch(`/areaapi/note/${areaId}/${product.Id}`, {
            method: "POST",
            body: note
        });

        setInputText(false);
    }

    return (
        <div className="px-4 py-2">
            <Card className="mb-1 p-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                    <div className="d-flex gap-2 align-content-center">
                    <button onClick={() => subtract()} className="">-</button>
                    <div className="pt-1">{count}</div>
                    <button onClick={() => add()} className="">+</button>
                    </div>
                    <Product product={product} />
                </div>
                <button onClick={() => nav(`/images/${areaId}/${product.Id}`)} className="btn">
                    <ImageIcon size={"30px"} />
                </button>
                </div>
                {
                    (inputText || (note && note.length !== 0))
                    && 
                    <div className="p-3">
                        <h3>Notes:</h3>
                        {!inputText ?
                            <div onClick={() => setInputText(true)} className="bg-grey p-2 rounded" style={{height: "20vh", overflowY: "scroll"}}>
                                <p>{note && note.split("\n").map(x => <p>{x}</p>)}</p>
                            </div>
                            : 
                            <div className="d-flex flex-column align-items-end gap-3">
                                <textarea onChange={handleChange} className="bg-grey p-2 rounded" value={note} style={{height: "20vh", width: "100%"}} />
                                <button className="btn btn-success" onClick={() => save()}>Save</button>
                            </div>
                        }
                    </div>
                }
                {
                    !inputText && (!note || note.length === 0) &&
                    <div className="d-flex justify-content-end">
                        <button onClick={() => setInputText(true)} className="btn btn-success">Add Note</button>
                    </div>
                }
            </Card>
        </div>
    );
}