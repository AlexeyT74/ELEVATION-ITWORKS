type typeLabelInput = { sName: string; sLabel: string; isPassword: boolean };

function UserInput({ sName, sLabel, isPassword = false }: typeLabelInput) {
    return (
      <>
        <label className="text-sm font-medium">{sLabel}</label>
        <input
          type={isPassword ? 'password' : 'text'}
          name={sName}
          className=" rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </>
    );
}

export default UserInput