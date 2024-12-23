import { useEffect, useState } from "react";

type Employee = {
  idEmployee: any;
  fullName: string;
  dateOfBirth: string;
};

const EmployeeForm: React.FC<{ employee: Employee; onSave: (employee: Employee) => void; onCancel: () => void }> = ({ employee, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Employee>(employee);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };
  
    useEffect(()=>{
      console.log(onCancel)
    },[])
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">{employee.idEmployee ? 'Edit' : 'Add'} Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded" 
                required 
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={onCancel} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default EmployeeForm;