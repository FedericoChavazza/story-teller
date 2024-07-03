import { useState } from "react";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import {
  dropdownData,
  locationData,
  characterTypeData,
} from "../../utils/utils";
import arrowLeft from "../../assets/arrow-left.png";
import styles from "./index.module.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { useStory } from "../../context/StoryContext/StoryContext";

const FormView = ({
  setSelectedGenre,
  isImageViewVisible,
  setIsImageViewVisible,
  onGenerateStory,
}) => {
  const [formData, setFormData] = useState({
    kid_name: "",
    age: "",
    story_location: locationData[0],
    theme: dropdownData[0],
    character: characterTypeData[0],
  });

  const { fetchStory } = useStory();

  const [errorHandler, setErrorHandler] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name, option) => {
    setFormData((prev) => ({ ...prev, [name]: option }));
    if (name === "theme") {
      setSelectedGenre(option);
    }
  };

  const onSubmit = () => {
    const errorDetected = detectErrors(formData);

    if (Object.keys(errorDetected).length === 0) {
      setErrorHandler({});

      const fetchStoryData = {
        story_location: formData.story_location.value,
        character: formData.character.value,
        theme: formData.theme.value,
        kid_name: formData.kid_name,
        age: formData.age,
      };

      fetchStory(fetchStoryData);
      onGenerateStory();
    } else {
      setErrorHandler(errorDetected);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        !isImageViewVisible ? styles.fullScreen : ""
      }`}
    >
      {!isImageViewVisible && (
        <Button
          customClass={styles.arrowLeft}
          type="transparent"
          onClick={() => setIsImageViewVisible(true)}
        >
          <img src={arrowLeft} alt="arrow-left" />
        </Button>
      )}
      <Logo />
      <div className={styles.title}>
        <h1>Create your own story</h1>
        <h2>
          Choose your characters, setting, and plot to generate a one-of-a-kind
          story.
        </h2>
      </div>
      <div className={styles.form}>
        <div className={styles.second_column}>
          <Input
            title="Kid's Name"
            name="kid_name"
            onChange={handleInputChange}
            placeholder="Write the name of the character..."
            errorMessage={errorHandler.kid_name}
          />
          <Input
            title="Age"
            name="age"
            onChange={handleInputChange}
            placeholder="Choose an age from 1 to 100..."
            type="number"
            min="3"
            max="90"
            errorMessage={errorHandler.age}
          />
        </div>
        <Dropdown
          options={characterTypeData}
          title="Character Type"
          selectedValue={formData.character}
          setSelectedValue={(option) =>
            handleDropdownChange("character", option)
          }
        />
        <div className={styles.second_column}>
          <Dropdown
            options={dropdownData}
            title="Theme"
            selectedValue={formData.theme}
            setSelectedValue={(option) => handleDropdownChange("theme", option)}
          />
          <Dropdown
            options={locationData}
            title="Story Location"
            selectedValue={formData.story_location}
            setSelectedValue={(option) =>
              handleDropdownChange("story_location", option)
            }
          />
        </div>
      </div>
      <Button onClick={onSubmit} type="primary">
        Generate Story
      </Button>
    </div>
  );
};

const detectErrors = (values) => {
  let errors = {};

  if (!values.kid_name || values.kid_name.match(/\d+/)) {
    errors.kid_name = "Should not be blank or contain any numbers";
  }

  if (!values.age || values.age < 1 || values.age > 99) {
    errors.age = "Cannot be younger than 0 or older than 100!";
  }

  return errors;
};

export default FormView;
