const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

// Hey GitHub Copilot, what's up?

/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags:
 *       - Comments
 *     description: Returns all comments
 *     responses:
 *       200:
 *         description: An array of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", async (req, res, next) => {
  const comments = await Comment.find();
  return res.json({
    comments: comments.map((comment) => {
      return comment.toJSON();
    }),
  });
});

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     description: Deletes a single comment
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of comment to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Comment not found
 */
// endpoint for deleting a comment
router.delete("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.sendStatus(404);
    }
    await comment.remove();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
