export function Cardcustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <strong>Nome: </strong>
        mercado silva
      </h2>
      <p>
        <strong>email:</strong> gustavo@teescte.com
      </p>
      <p>
        <strong>telefone:</strong> 41995566353
      </p>
      <button className="bg-red-500 px-4 rounded-lg text-white mt-2 self-start">
        {" "}
        Deletar
      </button>
    </article>
  );
}
