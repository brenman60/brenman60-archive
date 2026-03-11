const RowTextImage = ({
    text,
    image,
    alt,
    imageRight = false
}) => {
  return (
    <section className={"row rowTextImage " + (imageRight ? "imageRight" : "imageLeft")}>
      <div>{text}</div>
      <div>
        <img src={image} alt={alt} onClick={() => window.open(image, '_blank')} />
      </div>
    </section>
  )
};

export default RowTextImage;
