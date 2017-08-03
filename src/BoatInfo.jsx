import React, { PropTypes } from 'react'

// Basic suggestion button.
function BoatInfo(props) {
  const {
    imei, iridiumCep, iridiumLatitude, iridiumLongitude, transmitTime,
  } = props

  return (
    <div>
      <p>{data}</p>
      <ul className="contribution">
        <li>Transmit Time: { transmitTime }</li>
        <li>Position: { iridiumLatitude } lat, { iridiumLongitude } lng. Within {iridiumCep} km.</li>
        <li>Message Number: { momsn }</li>
        <li>RockBlock IMEI: { imei }</li>
      </ul>
    </div>
  )
}

BoatInfo.propTypes = {
  dateNow: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  donation: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  invoice: PropTypes.string.isRequired,
  recognition: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
}
BoatInfo.defaultProps = {
}
export default BoatInfo
