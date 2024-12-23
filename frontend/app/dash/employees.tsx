import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import EmployeeForm from "./components/employee-form";
import Cookies from 'js-cookie';
import { FaUserPlus, FaSearch } from "react-icons/fa";
import QRCode from 'qrcode';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import * as XLSX from 'xlsx';

import EmployeeBadgeModal from "./components/badge-modal";
import { toPng } from "html-to-image";
import Badge from "./components/badge";

// Initialize dayjs with French locale
dayjs.locale('fr');

type Employee = {
  idEmployee: any;
  fullName: string;
  dateOfBirth: string;
};

const EmployeeList: React.FC = () => {
  const data = useLoaderData();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchEmployees = async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch("http://127.0.0.1:8080/api/employee", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      if (data) {
        setEmployees(data);
        setFilteredEmployees(data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Erreur lors de la récupération des employés.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [data]);

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const addEmployee = async (newEmployee: Employee): Promise<void> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch("http://127.0.0.1:8080/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Échec de l'ajout de l'employé");
      }

      const savedEmployee = await response.json();
      setEmployees((prevEmployees) => [...prevEmployees, savedEmployee]);
      toast.success("Employé ajouté avec succès");
    } catch (error: any) {
      toast.error("Erreur lors de l'ajout de l'employé : " + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      try {
        setLoading(true);
        const token = Cookies.get('token');
        const response = await fetch(`http://127.0.0.1:8080/api/employee/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Échec de la suppression de l'employé");
        }
        setEmployees(employees.filter((emp) => emp.idEmployee !== id));
        toast.success("Employé supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'employé : " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleSave = async (employee: Employee) => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const url =`http://127.0.0.1:8080/api/employee/${employee.idEmployee}`
      const method =  "PUT" 
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement de l'employé");
      }
  
      const savedEmployee = await response.json();
  
      // Mettre à jour la liste des employés
      setEmployees((prevEmployees) => {
        if (employee.idEmployee) {
          // Mise à jour d'un employé existant
          return prevEmployees.map((emp) =>
            emp.idEmployee === savedEmployee.idEmployee ? savedEmployee : emp
          );
        } else {
          // Ajout d'un nouvel employé
          return [...prevEmployees, savedEmployee];
        }
      });
  
      toast.success("Employé enregistré avec succès");
    } catch (error: any) {
      toast.error("Erreur lors de l'enregistrement de l'employé : " + error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleAdd = () => {
    setEditingEmployee({ idEmployee: null, fullName: "", dateOfBirth: "" });
    setShowModal(true);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(employees);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "employees.xlsx");
    toast.success("Liste des employés exportée avec succès");
  };

  const [showBadgeMofal,setBadgeModal]= useState(false);
  let badgeRef = useRef<HTMLDivElement>(null);
  const generateBadgeAsPng = async (employee: Employee) => {
    try {
        // Create a container for the badge with Tailwind classes
        const container = document.createElement("div");
        container.className = "w-[400px] h-[200px] flex justify-between items-center border border-gray-300 p-6 bg-white";

        // Generate QR Code as data URL
        const qrCodeDataUrl = await QRCode.toDataURL(`${employee.idEmployee} - ${employee.fullName}`, {
            width: 128,
            margin: 2,
        });

        // Left side: QR code
        const qrCodeImg = document.createElement("img");
        qrCodeImg.src = qrCodeDataUrl;
        qrCodeImg.alt = "QR Code";
        qrCodeImg.className = "w-[120px] h-[120px] bg-white";

        // Right side: Employee info with Tailwind classes
        const infoContainer = document.createElement("div");
        infoContainer.className = "flex flex-col justify-center items-start space-y-3 w-[650px]";
        infoContainer.innerHTML = `
        
            <div class="text-xl font-bold">${employee.fullName}</div>
            <div class="flex items-center text-base text-gray-600">
                <span class="font-medium">ID:</span>
                <span class="ml-2">${employee.idEmployee}</span>
            </div>
            <div class="flex items-center text-base text-gray-600">
                <span class="font-medium">Date de naissance:</span>
                <span class="ml-2">${employee.dateOfBirth}</span>
            </div>
        
        `;

        // Append QR code and info to container
        container.appendChild(qrCodeImg);
        container.appendChild(infoContainer);

        document.body.appendChild(container);

        // Convert the container to an image with a white background
        const image = await toPng(container, { backgroundColor: "white" });

        // Clean up temporary container
        document.body.removeChild(container);

        // Create a download link for the image
        const link = document.createElement("a");
        link.href = image;
        link.download = `badge-${employee.idEmployee}.png`;
        link.click();

        // Display success message
        toast.success("Badge généré et téléchargé en PNG");
    } catch (error) {
        // Handle errors
        console.error(error);
        toast.error("Erreur lors de la génération du badge en PNG");
    }
};
  const paginate = (employees: Employee[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return employees.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Liste des employés</h1>
      <Toaster position="bottom-right" />
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaUserPlus className="mr-2" /> Ajouter un employé
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Exporter en Excel
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par nom complet"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nom Complet</th>
                <th className="border border-gray-300 px-4 py-2">Date de naissance</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginate(filteredEmployees).length > 0 ? (
                paginate(filteredEmployees).map((employee) => (
                  <tr key={employee.idEmployee}>
                    <td className="border border-gray-300 px-4 py-2">{employee.idEmployee}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.fullName}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{dayjs(employee.dateOfBirth).format('DD MMMM YYYY')}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="relative inline-block">
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => handleEdit(employee)}
                        >
                          ✏️ Éditer
                        </button>
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => handleDelete(employee.idEmployee)}
                        >
                          🗑️ Supprimer
                        </button>
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => generateBadgeAsPng(employee)}
                        >
                          🏷️ Générer Badge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Pas d'employés disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Précédent
            </button>
            <p>
              Page {currentPage} sur {totalPages}
            </p>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </>
      )}
      {showModal && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={editingEmployee?.idEmployee ? handleSave : addEmployee}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
