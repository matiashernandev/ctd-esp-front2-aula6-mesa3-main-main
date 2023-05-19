import React from "react";
import "./index.css";
import { useState, useEffect } from "react";

interface DataProps {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  actualData: string[];
}

const App = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://my-json-server.typicode.com/DH-Esp-Frontend/ctd-esp-front2-aula6-mesa3-main/posts`
        );
        if (!response.ok) {
          throw new Error(
            `Este es un error HTTP, el estado es: ${response.status}`
          );
        }
        const actualData: DataProps[] = await response.json();
        setData(actualData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Noticias de Rick and Morty</h1>
      {loading && <p>Un momento por favor...</p>}
      {error && (
        <p>{`Hubo un problema al obtener los datos de la publicación: ${error}`}</p>
      )}
      <article>
        {data.map(({ id, title, description, image }) => (
          <span key={id}>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
          </span>
        ))}
      </article>
    </div>
  );
};

export default App;
