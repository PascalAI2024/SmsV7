import React, { useRef } from 'react';
import { Users, Upload, Download, Trash2, FileText } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import toast from 'react-hot-toast';

const ContactManagement: React.FC = () => {
  const { contacts = [], setContacts } = useCampaignStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0].map(header => header.trim().toLowerCase());
        
        const nameIndex = headers.indexOf('name');
        const phoneIndex = headers.findIndex(h => ['phone', 'mobile', 'number'].includes(h));

        if (nameIndex === -1 || phoneIndex === -1) {
          throw new Error('CSV must contain "name" and one of: "phone", "mobile", "number" columns');
        }

        const formattedContacts = rows.slice(1)
          .filter(row => row.length >= Math.max(nameIndex, phoneIndex) + 1)
          .map((row, index) => ({
            id: `contact-${index}`,
            name: row[nameIndex].trim(),
            phone: row[phoneIndex].trim(),
            status: 'pending' as const,
          }))
          .filter(contact => contact.name && contact.phone);

        if (formattedContacts.length === 0) {
          throw new Error('No valid contacts found in CSV');
        }

        setContacts(formattedContacts);
        toast.success(`Imported ${formattedContacts.length} contacts`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error importing contacts');
        console.error(error);
      }
    };

    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error('No contacts to export');
      return;
    }

    const csvContent = contacts.map(contact => ({
      name: contact.name,
      phone: contact.phone,
      status: contact.status,
    }));

    const csvString = [
      ['name', 'phone', 'status'].join(','),
      ...csvContent.map(row => Object.values(row).join(',')),
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contacts.csv';
    link.click();
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success('Contact deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Contact Management</h3>
        </div>

        <div className="flex gap-2">
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportCSV}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-white">Actions</th>
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
                <td className="px-4 py-3 text-sm text-right">
                  <button 
                    onClick={() => handleDeleteContact(contact.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
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

export default ContactManagement;