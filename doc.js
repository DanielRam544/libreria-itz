/**
 * @swagger
 * /libros:
 *   get:
 *     summary: Obtener todos los libros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Libros
 *  
 */

/**
 * @swagger
 * /libros/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del libro
 */

/**
 * @swagger
 * /libros:
 *   post:
 *     summary: Crear un nuevo libro
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "10 reglas para vivir"
 *               autor:
 *                 type: string
 *                 example: "J. B. Piterson"
 *               year:
 *                 type: number
 *                 example: 2024
 *     responses:
 *       201:
 *         description: Libro creado con éxito
 */

/**
 * @swagger
 * /libros/{id}:
 *   put:
 *     summary: Actualizar un libro por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del libro actualizar
 *        schema:
 *          type: string
 *      - in: body  
 *        required: true
 *        name: libro
 *        schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nombre de libro actualizar"
 *               autor:
 *                 type: string
 *                 example: "Nombre del Autor actualizar"
 *               year:
 *                 type: number
 *                 example: 2023
 *     responses:
 *       200:
 *         description: Libro actualizado con éxito 
 * 
 */

/**
 * @swagger
 * /libros/{id}:
 *   delete:
 *     summary: Eliminar un libro por id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: libro eliminado correctamente
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "danielu@gmail.com"
 *               password:
 *                 type: string
 *                 example: "1233"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 */

/**
 * @swagger
 * /get-token:
 *   post:
 *     summary: Obtener un token de autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "gustavo@gmail.com"
 *               api_key:
 *                 type: string
 *                 example: "FFa4san6N24jQ2N"
 *     responses:
 *       201:
 *         description: TOKEN GENERADO!!
 */
