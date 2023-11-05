import React, {useState, useRef, useEffect} from "react";
import AllImages from "../../store/store.js";
import "./ImageGallery.css"
import {Button, Card, Form, Row} from "react-bootstrap";
import Header from "../../components/Header.jsx";

const ImageGallery = () => {
    const cardRef = useRef(null)
    const [imageAlbum , setImageAlbum] = useState(AllImages);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverIndex , setHoverIndex] = useState(null);
    const [isCheck, setIsCheck] = useState([]);
    const [dragOverIndex , setDragOverIndex] = useState(null);
    const [moveImg , setMoveImg] = useState(true);
    const [prevMoveImg , setPrevMoveImg] = useState(null);

    useEffect(() => {
        if(prevMoveImg !== null && dragOverIndex !== null && prevMoveImg !== dragOverIndex && !moveImg){
            setMoveImg(true);
            console.log("inside");
        }
    }, [prevMoveImg,dragOverIndex]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text', index);
        setDraggedIndex(index);
        //console.log("Drag Start", index)
    };

    const handleDragOver = (e,index) => {
        e.preventDefault();
        setDragOverIndex(index);
        if(dragOverIndex !== null && draggedIndex !== null && dragOverIndex !== draggedIndex && dragOverIndex === index && moveImg){
            const updatedImages = [...imageAlbum];
            const [draggedImage] = updatedImages.splice(draggedIndex, 1);
            console.log("img",draggedImage);
            updatedImages.splice(index, 0, draggedImage);
            setImageAlbum(updatedImages);
            setMoveImg(false);
            setPrevMoveImg(dragOverIndex);
            setDraggedIndex(index);
        }
    }

    const handleDrop = (e, index) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData('text')
        if (dragIndex !== index) {
            setDragOverIndex(null);
            setPrevMoveImg(null);
            setMoveImg(true);
        }
    };


    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, parseInt(id)]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
        }
    };
    const deleteItems = () => {
        const updatedImageAlbum = imageAlbum.filter(item => !isCheck.includes(item.id));
        setImageAlbum(updatedImageAlbum);
        setIsCheck([]);
    }

    return(
        <>
            <div>
                <Header/>
                <div className="my-5 container">
                    <Card>
                        <Card.Header className="px-4 d-flex justify-content-between align-items-center fs-5">
                            {isCheck.length ?
                                <>
                                    <Form.Check
                                        checked={true}
                                        readOnly={true}
                                        label={`${isCheck.length} File${isCheck.length > 1 ? 's' : ''} Selected`}
                                    />
                                    <Button variant="outline-danger" onClick={deleteItems}>
                                        Delete Files
                                    </Button>
                                </> :
                                <>
                                    <span className="py-1 fw-bold">Gallery</span>
                                </>}
                        </Card.Header>
                        <Card.Body>
                            <div className="gallery m-2">
                                {imageAlbum.map((image,index) => (
                                    <div key={index} className={`gallery-item ${index === 0 ? 'feature-image' : ''}`}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        draggable
                                        onDrop={(e) => handleDrop(e,index)}
                                        onDragOver={(e) => {
                                            handleDragOver(e,index)
                                        }}
                                        onDragEnd={() => {
                                            setDraggedIndex(null);
                                            setDragOverIndex(null);
                                        }}
                                        onMouseEnter={() => {
                                            setHoverIndex(index);
                                            setIsHovered(true);
                                        }}
                                        onMouseLeave={() => {
                                            setHoverIndex(null);
                                            setIsHovered(false)
                                        }}
                                         style={{
                                             // transform: `${dragOverIndex !== null ? `scale(1)`: ''}`,
                                             // transition: `${dragOverIndex !== null ? 'scale 0.5s ease-in-out' : ''}`,

                                         }}
                                    >
                                        <img src={image.imageUrl} alt={image.name}
                                             style={{
                                                 opacity: `${isCheck.includes(image.id) ? '0.5': ''}`,
                                                 // animationName: `${dragOverIndex !== null ? 'example' : ''}`,
                                                 // animationDuration: `${dragOverIndex !== null ? '1s' : ''}`
                                            }}
                                        />
                                        {isHovered && hoverIndex === index && (
                                            <span style={{position:"absolute" , top:"10px", left:"10px",zIndex:"2" , cursor:"pointer"}}>
                                                <Form.Check
                                                    key={index}
                                                    name={image.name}
                                                    type="checkbox"
                                                    id={image.id}
                                                    onChange={handleClick}
                                                    checked={isCheck.includes(image.id)}
                                                />
                                            </span>
                                        )}
                                        {isCheck.includes(image.id) && (
                                            <span style={{position:"absolute" , top:"10px", left:"10px",zIndex:"3" , cursor:"pointer"}}>
                                                <Form.Check
                                                    key={index}
                                                    name={image.name}
                                                    type="checkbox"
                                                    id={image.id}
                                                    onChange={handleClick}
                                                    checked={isCheck.includes(image.id)}
                                                />
                                            </span>
                                        )}
                                        {dragOverIndex !== null && draggedIndex !== null && dragOverIndex === draggedIndex && draggedIndex === index && (
                                            <span style={{position:"absolute",top:"0px",left:"0px" , background:"gray" , opacity:"1", height:"100%",zIndex:"6" , width:"100%"}}></span>
                                        )}
                                        {dragOverIndex !== null && draggedIndex !== null && dragOverIndex !== draggedIndex && dragOverIndex === index && (
                                            <span style={{position:"absolute",top:"0px",left:"0px" , background:"white" , opacity:"1", height:"100%",zIndex:"6" , width:"100%"}}></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <br/>
                {/*<div style={{background:"black",height:"200px",width:"300px"}}*/}
                {/*     onDrop={(e) => handleDragOver(e)}*/}
                {/*     onDragOver={(e) => e.preventDefault()}>*/}

                {/*</div>*/}
            </div>
        </>
    )
}

export default ImageGallery;