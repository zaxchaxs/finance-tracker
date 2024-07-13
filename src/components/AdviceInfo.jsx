const { faExclamationCircle } = require("@fortawesome/free-solid-svg-icons")
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome")

const AdviceInfo = ({totalAmount}) => {
    return(
        <div className="text-secondary text-lg flex flex-col justify-center items-center gap-4">
        {totalAmount?.income === totalAmount?.expanse ? (
          ""
        ) : (
          <FontAwesomeIcon icon={faExclamationCircle} />
        )}

        <h1 className="text-center">
          {totalAmount?.income === totalAmount?.expanse
            ? ""
            : totalAmount?.income > totalAmount?.expanse
            ? `Great, your expenses aren't bad. Keep it up!`
            : "You should be more mindful of your spending. Stop wasting money on useless stuff."}
        </h1>
      </div>
    )
};

export default AdviceInfo;