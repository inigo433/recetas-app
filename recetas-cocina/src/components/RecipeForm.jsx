// src/components/RecipeForm.js
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

function RecipeForm({ editMode }) {
  const [nombre, setNombre] = useState('');
  const [ingredientes, setIngredientes] = useState([
    { nombre: '', descripcion: '', cantidad: '' },
    { nombre: '', descripcion: '', cantidad: '' },
    { nombre: '', descripcion: '', cantidad: '' }
  ]);
  const [pasos, setPasos] = useState(['', '', '']);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
      const receta = recetas.find((r) => r.id === id);
      if (receta) {
        setNombre(receta.nombre);
        setIngredientes(receta.ingredientes);
        setPasos(receta.pasos);
      }
    }
  }, [editMode, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaReceta = {
      id: editMode ? id : crypto.randomUUID(),
      nombre,
      ingredientes,
      pasos
    };

    const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
    const actualizadas = editMode
      ? recetas.map((r) => (r.id === id ? nuevaReceta : r))
      : [...recetas, nuevaReceta];

    localStorage.setItem('recetas', JSON.stringify(actualizadas));
    Swal.fire('¡Guardado!', 'La receta ha sido guardada correctamente.', 'success');
    navigate('/recetas');
  };

  const handleIngredienteChange = (index, field, value) => {
    const nuevos = [...ingredientes];
    nuevos[index][field] = value;
    setIngredientes(nuevos);
  };

  const handlePasoChange = (index, value) => {
    const nuevos = [...pasos];
    nuevos[index] = value;
    setPasos(nuevos);
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">{editMode ? 'Editar Receta' : 'Crear Nueva Receta'}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Receta</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <h5>Ingredientes</h5>
          {ingredientes.map((ing, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <Form.Label>Ingrediente {index + 1}</Form.Label>
              <Form.Control
                placeholder="Nombre"
                className="mb-1"
                value={ing.nombre}
                onChange={(e) => handleIngredienteChange(index, 'nombre', e.target.value)}
                required
              />
              <Form.Control
                placeholder="Descripción"
                className="mb-1"
                value={ing.descripcion}
                onChange={(e) => handleIngredienteChange(index, 'descripcion', e.target.value)}
                required
              />
              <Form.Control
                placeholder="Cantidad"
                value={ing.cantidad}
                onChange={(e) => handleIngredienteChange(index, 'cantidad', e.target.value)}
                required
              />
            </div>
          ))}

          <h5>Pasos de preparación</h5>
          {pasos.map((paso, index) => (
            <Form.Group key={index} className="mb-2">
              <Form.Label>Paso {index + 1}</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={paso}
                onChange={(e) => handlePasoChange(index, e.target.value)}
                required
              />
            </Form.Group>
          ))}

          <div className="d-grid mt-4">
            <Button type="submit" variant="success">
              {editMode ? 'Actualizar Receta' : 'Guardar Receta'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RecipeForm;