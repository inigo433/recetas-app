// src/components/RecipeList.js
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recetas')) || [];
    setRecipes(stored);
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = recipes.filter((r) => r.id !== id);
        localStorage.setItem('recetas', JSON.stringify(updated));
        setRecipes(updated);
        Swal.fire('¡Eliminado!', 'La receta ha sido eliminada.', 'success');
      }
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-center">Listado de Recetas</h2>
      {recipes.length === 0 ? (
        <p className="text-center">No hay recetas guardadas.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ingredientes</th>
              <th>Pasos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((receta) => (
              <tr key={receta.id}>
                <td>{receta.nombre}</td>
                <td>
                  <ul>
                    {receta.ingredientes.map((ing, i) => (
                      <li key={i}>
                        <strong>{ing.nombre}</strong>: {ing.descripcion} ({ing.cantidad})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ol>
                    {receta.pasos.map((paso, i) => (
                      <li key={i}>{paso}</li>
                    ))}
                  </ol>
                </td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(receta.id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(receta.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default RecipeList;