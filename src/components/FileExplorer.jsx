import React, { useState } from 'react';

// Initial file structure
const initialFiles = [
  {
    name: 'Folder 1',
    type: 'folder',
    isOpen: false,
    contents: [
      { name: 'File 1-1.txt', type: 'file' },
      { name: 'File 1-2.txt', type: 'file' },
      {
        name: 'Subfolder 1-1',
        type: 'folder',
        isOpen: false,
        contents: [{ name: 'File 1-1-1.txt', type: 'file' }],
      },
    ],
  },
  {
    name: 'Folder 2',
    type: 'folder',
    isOpen: false,
    contents: [{ name: 'File 2-1.txt', type: 'file' }],
  },
  { name: 'File 3.txt', type: 'file' },
];

// Recursive component to display files and folders
const FileExplorerItem = ({ file, toggleFolder, deleteItem }) => {
  if (file.type === 'file') {
    return (
      <div style={{ paddingLeft: '20px' }}>
        📄 {file.name}
        <button onClick={() => deleteItem(file.name)} style={{ marginLeft: '10px' }}>
          Delete
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: '10px' }}>
      <div onClick={() => toggleFolder(file.name)} style={{ cursor: 'pointer' }}>
        {file.isOpen ? '📂' : '📁'} {file.name}
        <button onClick={() => deleteItem(file.name)} style={{ marginLeft: '10px' }}>
          Delete
        </button>
      </div>
      {file.isOpen && (
        <div style={{ paddingLeft: '20px' }}>
          {file.contents.map((item, index) => (
            <FileExplorerItem
              key={index}
              file={item}
              toggleFolder={toggleFolder}
              deleteItem={deleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  const [files, setFiles] = useState(initialFiles);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('file');
  const [targetFolder, setTargetFolder] = useState('');

  // Toggle folder open/close
  const toggleFolder = (folderName) => {
    const toggleFolderState = (items) => {
      return items.map((item) => {
        if (item.type === 'folder' && item.name === folderName) {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.type === 'folder') {
          return { ...item, contents: toggleFolderState(item.contents) };
        }
        return item;
      });
    };

    setFiles(toggleFolderState(files));
  };

  // Add new file/folder
  const addNewItem = () => {
    const newItem = {
      name: newName,
      type: newType,
      ...(newType === 'folder' ? { isOpen: false, contents: [] } : {}),
    };

    const addToFolder = (items) => {
      return items.map((item) => {
        if (item.type === 'folder' && item.name === targetFolder) {
          return { ...item, contents: [...item.contents, newItem] };
        }
        if (item.type === 'folder') {
          return { ...item, contents: addToFolder(item.contents) };
        }
        return item;
      });
    };

    if (targetFolder) {
      setFiles(addToFolder(files));
    } else {
      setFiles([...files, newItem]);
    }

    setNewName('');
    setTargetFolder('');
  };

  const deleteItem = (itemName) => {
    const removeItem = (items) => {
      return items
        .filter((item) => item.name !== itemName) // Remove the matched item
        .map((item) => {
          if (item.type === 'folder') {
            return { ...item, contents: removeItem(item.contents) }; // Recursively check folder contents
          }
          return item;
        });
    };
  
    setFiles(removeItem(files));
  };
  

  return (
    <div>
      <h2>File Explorer</h2>
      <div>
        {files.map((file, index) => (
          <FileExplorerItem
            key={index}
            file={file}
            toggleFolder={toggleFolder}
            deleteItem={deleteItem}
          />
        ))}
      </div>
      
      {/* Add new file/folder form */}
      <div style={{ marginTop: '20px' }}>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <select value={newType} onChange={(e) => setNewType(e.target.value)}>
          <option value="file">File</option>
          <option value="folder">Folder</option>
        </select>
        <input
          type="text"
          placeholder="Target Folder (optional)"
          value={targetFolder}
          onChange={(e) => setTargetFolder(e.target.value)}
        />
        <button onClick={addNewItem}>Add</button>
      </div>
    </div>
  );
};

export default FileExplorer;
