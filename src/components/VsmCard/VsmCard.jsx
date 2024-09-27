/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "./VsmCard.module.css"; // Make sure you have this CSS file

function VsmCard({ POC, Process, User }) {
  return (
    <>
      {/* <div className={styles.cardContainer}>
        <div className={styles.section}>
          <h3 className={styles.title}>Batch Info</h3>
          <p>Batch ID: {POC?.BatchId}</p>
          <p>Batch Quantity: {POC?.BatchQnt}</p>
          <p>Scrap Quantity: {POC?.ScrapQnt}</p>
          <p>Movement: {POC?.Movement}</p>
          <p>Interditated: {POC?.Interditated ? "Yes" : "No"}</p>
          <p>Created At: {new Date(POC.created_at).toLocaleString()}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Process Info</h3>
          <p>Process ID: {Process?.id}</p>
          <p>Process Name: {Process?.Name}</p>
          <p>Type: {Process?.Type}</p>
          <p>OEE: {Process?.OEE}</p>
          <p>Order: {Process?.Order}</p>
          <p>POT: {Process?.POT}</p>
          <p>Created At: {new Date(POC.created_at).toLocaleString()}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>User Info</h3>
          <p>User Name: {User?.DisplayName}</p>
          <p>Email: {User?.Email}</p>
          <p>First Name: {User?.FirstName}</p>
          <p>Last Name: {User?.LastName}</p>
          <p>Created At: {new Date(POC.created_at).toLocaleString()}</p>
        </div>
        <div className={styles.footer}>Shared</div>
      </div> */}
      <div className={styles.cardContainer}>
        <div className={styles.section}>
          <h3 className={styles.title}>{Process?.Name}</h3>
          <p className={styles.element}>CT: {Process?.CT}</p>
          <p className={styles.element}>OEE: {Process?.OEE}</p>
          <p className={styles.element}>POT: {Process?.POT}</p>
          <p className={styles.element}>MAEQnt: {Process?.MAEQnt}</p>
          <p className={styles.element}>Order: {Process?.Order}</p>
          {/* <p>Created At: {new Date(POC.created_at).toLocaleString()}</p> */}
        </div>
        <div className={styles.footer}>Shared</div>
      </div>
    </>
  );
}

export default VsmCard;
