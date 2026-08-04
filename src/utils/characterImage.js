import defaultCharacterImage from "../assets/characters/character_hello_1.png";

const basicImageModules = import.meta.glob(
  "../assets/characters/character_basic_*.png",
  { eager: true, import: "default" }
);

const helloImageModules = import.meta.glob(
  "../assets/characters/character_hello_*.png",
  { eager: true, import: "default" }
);

const mapById = (modules, prefix) =>
  Object.fromEntries(
    Object.entries(modules).map(([path, src]) => {
      const id = Number(path.match(new RegExp(`${prefix}_(\\d+)\\.png$`))[1]);
      return [id, src];
    })
  );

const CHARACTER_IMAGES = mapById(basicImageModules, "character_basic");
const CHARACTER_HELLO_IMAGES = mapById(helloImageModules, "character_hello");

// 목록/카드용 기본 포즈 이미지
export const getCharacterImage = (characterId) =>
  CHARACTER_IMAGES[characterId] ?? defaultCharacterImage;

// 장착 중인 캐릭터를 크게 보여줄 때 쓰는 인사 포즈 이미지
export const getCharacterHelloImage = (characterId) =>
  CHARACTER_HELLO_IMAGES[characterId] ?? defaultCharacterImage;

export { defaultCharacterImage };
