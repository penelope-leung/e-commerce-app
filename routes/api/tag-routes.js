const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
  const tagData = await Tag.findAll({
  // be sure to include its associated Product data
  include: [{ model: Product}, { model: ProductTag}],
});
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
  include: [{ model: Product }, { model: ProductTag}],
      });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    return tag.findAll({ where: { tag_id: req.params.id } });
    const tagIds = tags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newTagIds = req.body.tagIds
      .filter((tag_id) => !tagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          tag_id: req.params.id,
        };
      });
    // figure out which ones to remove
    const tagsToRemove = tags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    return Promise.all([
      tag.destroy({ where: { id: tagsToRemove } }),
      tag.bulkCreate(newTagIds),
    ]);
  })
  router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const Tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Tag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(Tag);
  } catch (err) {
    res.status(500).json(err);
  }
});
});

module.exports = router;
