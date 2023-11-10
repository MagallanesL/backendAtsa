import mysql from "mysql2/promise";
import config from "./../config.js";
import  datosAfiliados  from "./afiliadosObjet.js";
import familiarData from "./familiarAfiliado.js";

const pool = mysql.createPool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

const getConnection = async () => {
  return await pool.getConnection();
};

// Get de Afiliados con toda su informacion.

const getAfiliados = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM afiliados");
    res.json(result);
    connection.release();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Get de Afiliados filtrados por nombre, apellido, sexo o dni.

const getDatos = async (req, res) => {
  try {
    const connection = await getConnection();
    const { criterio, valor } = req.body;
    if (!criterio || !valor) {
      const [result] = await connection.query("SELECT * FROM afiliados");
      res.json(result);
      connection.release();
      return;
    }
    const [result] = await connection.query(
      "SELECT * FROM afiliados WHERE ?? LIKE ?",
      [criterio, `%${valor}%`]
    );
    res.json(result);
    connection.release();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

//agregar Afiliado
const addAfiliado = async (req, res) => {
  try {
    const newAfiliadoData = {
      ...datosAfiliados, // objeto afiliado
      ...req.body,
    };

    const connection = await getConnection();
    const [result] = await connection.query(
      "INSERT INTO afiliados SET ?",
      newAfiliadoData
    );

    res.json({ message: "Se Agrego Afiliado" });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

//Add Familiar

const addFamiliar = async (req, res) => {
  console.log(req.body);
  try {
    const newFamiliarData = {
      ...req.body,
    };
console.log(newFamiliarData)
    const connection = await getConnection();
    const [result] = await connection.query(
      "INSERT INTO familiares SET ?", 
      newFamiliarData
    );

    res.json({ message: "se agrego Familiar a cargo" });
  } catch (error) {
    console.error("Error al insertar familiar:", error);
    res.status(500).json({ error: "No se pudo insertar familiar" });
  }
};

//GET Familiar

const getFamiliar = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM familiares");
    res.json(result);
    connection.release();
    console.log(res);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};


//Eliminar Afiliado

const deleteAfiliados = async (req, res) => {
  try {
    const connection = await getConnection();
    const dni = req.params.dni;

    if (!dni || typeof dni !== "number") {
      return res.status(400).json({ error: "Invalid DNI provided" });
    }

    const [result] = await connection.query("DELETE FROM afiliados WHERE DNI = ?", [dni]);
    connection.release();

    if (result.affectedRows === 1) {
      return res.json({ message: "Afiliado eliminado correctamente" });
    } else {
      return res.status(404).json({ error: "El afiliado no fue encontrado o no pudo ser eliminado" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};


// Actualizar Datos afiliados.
const updateAfiliados = async (req, res) => {
  try {
    const connection = await getConnection();
    const dni = req.params.dni; 
    const newData = req.body;

    if (isNaN(dni) || typeof dni !== "number") {
      return res.status(400).json({ error: "DNI inválido proporcionado" });
    }

    const [result] = await connection.query("UPDATE afiliados SET ? WHERE dni = ?", [newData, dni]);
    connection.release();

    if (result.affectedRows === 1) {
      return res.json({ message: "Afiliado actualizado correctamente" });
    } else {
      return res.status(404).json({ error: "El afiliado no fue encontrado o no pudo ser actualizado" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};

export const methods = {
  getAfiliados,
  getDatos,
  getFamiliar,
  addAfiliado,
  addFamiliar,
  deleteAfiliados,
  updateAfiliados
};
