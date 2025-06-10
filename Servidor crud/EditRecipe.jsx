import React, { useState } from 'react';

function EditRecipe({ recipe, onUpdated, onCancel }) {
  const [form, setForm] = useState({ ...recipe });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/recipes/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => onUpdated());
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Editar Receta</h3>
      <input name="title" value={form.title} onChange={handleChange} required />
      <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required />
      <textarea name="instructions" value={form.instructions} onChange={handleChange} required />
      <input name="cookingTime" type="number" value={form.cookingTime} onChange={handleChange} required />
      <button type="submit">Actualizar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default EditRecipe;
