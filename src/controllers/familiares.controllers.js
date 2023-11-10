import mysql from "mysql2/promise";
import config from "./../config.js";
import familiaAfiliado from "./familiarAfiliado.js";


const pool = mysql.createPool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

const getConnection = async () => {
  return await pool.getConnection();
};


const addFamiliar = async (req, res) => {
    try {
      const familiarData = req.body;
      const connection = await getConnection();
      const result = await connection.query("INSERT INTO familiares SET ?", familiarData);
      await connection.release();
  
      if (result.affectedRows === 1) {
        res.status(201).json({ message: "Se agregó el familiar con éxito" });
      } else {
        res.status(500).json({ error: "Error al insertar el familiar en la base de datos" });
      }
    } catch (error) {
      console.error("Error al insertar el familiar:", error);
      res.status(500).json({ error: "Error al insertar el familiar en la base de datos" });
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


export const methods = {
    addFamiliar,
    getFamiliar
};