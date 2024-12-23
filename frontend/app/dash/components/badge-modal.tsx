
import EmployeeBadgeGenerator from "./badge-generator";


interface Employee {
    idEmployee: string;
    fullName: string;
    dateOfBirth: string;
  }
  
const EmployeeBadgeModal: React.FC<{ employee: Employee; isOpen: boolean; onClose: () => void }> = ({ employee, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFF',
            padding: '20px',
            borderRadius: '10px',
            width: '500px',
            textAlign: 'center',
          }}
        >
          <h2>Badge de l'employé</h2>
          <EmployeeBadgeGenerator employee={employee} />
          <button
            onClick={onClose}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#FF0000',
              color: '#FFF',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    );
  };

  export default EmployeeBadgeModal;