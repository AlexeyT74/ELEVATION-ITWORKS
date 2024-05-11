type typeLabelInput = { sName: string; sLabel: string; bType?: "text"|"password"|"email"|"date" };

function LabelInput({ sName, sLabel, bType = "text" }: typeLabelInput) {
  return (
    <div className="flex flex-col space-y-0">
      <label className="text-sm font-medium">{sLabel}</label>
      <input
        type={bType}
        name={sName}
        className=" rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

export default LabelInput;
