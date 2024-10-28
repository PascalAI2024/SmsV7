import React from 'react';
import { Upload, Trash2, FileText } from 'lucide-react';
import { useCampaignStore } from '../store/campaignStore';
import CSVReader from 'react-csv-reader';
import toast from 'react-hot-toast';

const ContactList: React.FC = () => {
  const { contacts, setContacts } = useCampaignStore();

  const handleCSVUpload = (data: any[], fileInfo: any) => {
    try {
      const formattedContacts = data
        .filter(row => row.name && (row.phone || row.mobile || row.number))
        .map((row, index) => ({
          id: `contact-${index}`,
          name: row.name,
          phone: row.phone || row.mobile || row.number,
          status: 'pending' as const,
        }));

      if (formattedContacts.length === 0) {
        throw new Error('No valid contacts found in CSV');
      }

      setContacts(formattedContacts);
      toast.success(`Imported ${formattedContacts.length} contacts`);
    } catch (error) {
      toast.error('Error importing contacts');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Contact List</h2>
        <div className="flex gap-2">
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload CSV
            <CSVReader
              cssClass="hidden"
              onFileLoaded={handleCSVUpload}
              parserOptions={{ header: true }}
            />
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-4 py-3 text-sm text-gray-300">{contact.name}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{contact.phone}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    contact.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                    contact.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No contacts uploaded yet</p>
                  <p className="text-sm">Upload a CSV file to get started</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;