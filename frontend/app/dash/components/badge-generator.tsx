
import React from "react";
import { toPng } from "html-to-image";
import { toast } from "react-hot-toast";
import Badge from "./badge";


interface Employee {
    idEmployee: string;
    fullName: string;
    dateOfBirth: string;
  }
const generateBadgeAsPng = async (employee: Employee) => {
    const container = document.getElementById("badge-container");
  
    if (!container) {
      toast.error("Erreur: Conteneur du badge non trouvé");
      return;
    }
  
    try {
      const image = await toPng(container);
      const link = document.createElement("a");
      link.href = image;
      link.download = `badge-${employee.idEmployee}.png`;
      link.click();
      toast.success("Badge généré et téléchargé en PNG");
    } catch (error) {
      toast.error("Erreur lors de la génération du badge en PNG");
    }
  };

const EmployeeBadgeGenerator: React.FC<{ employee: Employee }> = ({ employee }) => {
    return (
      <div>
        <Badge employee={employee} />
        <button
          onClick={() => generateBadgeAsPng(employee)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Télécharger le badge
        </button>
      </div>
    );
  };
  
  export default EmployeeBadgeGenerator;