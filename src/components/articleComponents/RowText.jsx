const RowText = ({
    children,
    className = "",
}) => {
  return (
    <section className={"row rowText " + className}>
        {children}
    </section>
  )
};

export default RowText;
