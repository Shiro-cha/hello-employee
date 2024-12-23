import {QRCodeCanvas} from "qrcode.react";
import dayjs from "dayjs";

interface Employee {
    idEmployee: string;
    fullName: string;
    dateOfBirth: string;
  }
  
  const Badge: React.FC<{ employee: Employee }> = ({ employee }) => {
    return (
      <div
        id="badge-container"
        style={{
          width: "400px",
          height: "200px",
          border: "1px solid black",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <QRCodeCanvas value={`${employee.idEmployee} - ${employee.fullName}`} size={128} />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h2>{employee.fullName}</h2>
          <p>ID: {employee.idEmployee}</p>
          <p>Date de naissance: {dayjs(employee.dateOfBirth).format("DD MMMM YYYY")}</p>
        </div>
      </div>
    );
  };

  export default Badge;