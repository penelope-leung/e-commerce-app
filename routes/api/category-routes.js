const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
 // be sure to include its associated Products
      include: [{ model: Product }],
    });
    
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  


router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Product.findByPk(req.params.id, {
  // be sure to include its associated Products
        include: [{ model: Product }],
      });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const  categoryData = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Category) => {
            return Category.findAll({ where: { category_id: req.params.id } });
             const newCategoryIds = req.body.categoryIds
        .filter((categoryId) => !categoryId.includes(categoryId))
        .map((category_id) => {
          return {
            category_id: req.params.id,
         
          };
        });     
          })
    
 
      // run both actions
      return Promise.all([
        Category.destroy({ where: { id: categoryToRemove } }),
        categoryId.bulkCreate(newCategoryIds),
      ]);
    })
    .then((updatedCategoryIds) => res.json(updatedCategoryIds))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryId = await CategoryId.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategoryId) {
      res.status(404).json({ message: 'No Category ID found with that id!' });
      return;
    }

    res.status(200).json(CategoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
