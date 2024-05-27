import { useEffect, useState } from 'react';

type typeLabelInput = {
  sName: string;
  sLabel: string;
  bType?: 'text' | 'password' | 'email' | 'date';
  sValue?: string;
};

// General pair of Label and Input usied in a project for styling
function LabelInput({ sName, sLabel, bType = 'text', sValue = undefined }: typeLabelInput) {
  const [valueInput, setValueInput] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setValueInput(value);
  }

  useEffect(() => {
    setValueInput(sValue);
  }, [sValue]);

  return (
    <div className="flex flex-col space-y-0">
      <label className="text-sm font-medium">{sLabel}</label>
      <input
        type={bType}
        name={sName}
        value={valueInput}
        onChange={handleChange}
        className=" rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

export default LabelInput;
