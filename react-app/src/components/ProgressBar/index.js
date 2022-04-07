const ProgressBar = ({bgcolor, completed}) => {

    if (completed > 100) completed = 100;

    const containerStyles = {
        height: 10,
        width: '65%',
        backgroundColor: "#444444",
        // borderRadius: 50,
        // margin: 50
      }

      const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
      }

      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }

      return (
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}></span>
          </div>
        </div>
      );
    };

export default ProgressBar;
