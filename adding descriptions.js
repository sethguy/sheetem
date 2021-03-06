
const db = firebase.firestore();
const modRefs = db.collection('sheetMods');


const modsObject = {
  "Object Labeling": {
    "name": "Object Labeling",
    "levelsConfig": [
      {
        "description": " Level 1 module has been selected. In this module, you will select the object that you hear out of three choices.  "
      },
      {
        "description": " Level 2 module has been selected. In this module, you will select the object that you hear in each room. "
      },
      {
        "description": " Level 3 module has been selected. In this module, you will select the object that is being described out of three choices. "
      },
      {
        "description": " Level 4 module has been selected. In this module, you will select the object that is being described in each room. "
      }
    ]
  },
  "Yes and No": {
    "name": "Yes and No",
    "levelsConfig": [
      {
        "description": " Level 1 module has been selected. In this module, you will select either “yes or “no” to answer each question based on an image."
      },
      {
        "description": " Level 2 module has been selected. In this module, you will select either “yes” or “no” to questions based on each sound clip."
      },
      {
        "description": " Level 3 module has been selected. In this module, you will select either “yes” or “no” to answer each question."
      }
    ]
  },
  "Following Directions": {
    "name": "Following Directions",
    "levelsConfig": [
      {
        "description": " Level 1 module has been selected. In this module, you be asked to move items in each room."
      },
      {
        "description": " Level 2 module has been selected. In this module, you will select the object that best fits each description. "
      },
      {
        "description": " Level 3 module has been selected. In this module, you will complete the tasks based on each household item."
      }
    ]
  },
  "WH Questions": {
    "name": "WH Questions",
    "description": "WH Questions module has been selected. In this module, you will select the answer that best fits each question."
  },
  "Sentence Comprehension": {
    "name": "Sentence Comprehension",
    "levelsConfig": [
      {
        "description": "Level 1 module has been selected. In this module, you will answer questions based on each given sentence. "
      },
      {
        "description": "Level 2 module has been selected. In this module, you will answer questions based on each given sentence."
      },
      {
        "description": "Level 3 module has been selected. In this module, you will answer questions based on each given sentence."
      }
    ]
  },
  "Paragraph": {
    "name": "Paragraph",
    "description": "The Paragraph Comprehension module has been selected. In this module, you will answer questions based on each given paragraph."
  },
  "Automatic Speech": {
    "name": "Automatic Speech",
    "description": "In this module, you will choose the right word that will complete the sentence."
  },
  "Object Naming": {
    "name": "Object Naming",
    "levelsConfig": [
      {
        "description": "Level 1 module has been selected. In this module, you will practice saying each item shown out loud. "
      },
      {
        "description": "Level 2 module has been selected. In this module, you will practice saying each item circled out loud circled in each room."
      }
    ]
  },
  "Sentence Completion": {
    "name": "Sentence Completion",
    "description": "The sentence completion module has been selected. In this module you will choose the right word that will complete the phrase or sentence."
  },
  "Verbs": {
    "name": "Verbs",
    "description": "The Verbs module has been selected. In this module, you will select the action in the image shown."
  },
  "Antonyms": {
    "name": "Antonyms",
    "levelsConfig": [
      {
        "description": "Level 1 Antonyms module has been selected. In this module, you will select the opposite of each word given."
      },
      {
        "description": "Level 2 Antonyms module has been selected. In this module, you will select the opposite of each word given."
      }
    ]
  },
  "Synonyms": {
    "name": "Synonyms",
    "levelsConfig": [
      {
        "description": "Level 1 module has been selected. In this module, you will select the answer that has a similar meaning to each given word."
      },
      {
        "description": "Level 2 module has been selected. In this module, you will select the answer that has a similar meaning to each given word."
      }
    ]
  },
  "Adjectives": {
    "name": "Adjectives",
    "description": "The Adjectives module has been selected. In this module, you will select the descriptive word that answers the question. "
  },
  "Categories": {
    "name": "Categories",
    "levelsConfig": [
      {
        "description": "Level 1 module has been selected. You will select the correct category based on words presented. "
      },
      {
        "description": "Level 2 module has been selected. You will select the word that is in the same category as the others. "
      }
    ]
  }
};

const modlist = Object.keys(modsObject).map(key => {
  const mod = modsObject[key];
  return mod;
});

(async () => {
  const mods = modlist.map(async (mod) => {
    const results = await modRefs.where('name', '==', mod.name).get();
    const firemod = results.docs[0];
    const { description, levelsConfig } = mod;

    let pac = (description && description.length) ? { description } : { levelsConfig }
    console.log("TCL: pac", pac)

    // await modRefs.doc(firemod.id).update({
    //   ...pac
    // })


    return {
      name: mod.name,
      firemod,
    }
  });



  const modslist = await Promise.all(mods);
  console.log("TCL: results", modslist.filter(mod => !mod.firemod).map(mod => mod.name));

})();
