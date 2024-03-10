import { genres } from '../../configs/genres.config';
import { slugify } from '../../core/utils/utilities.utils';

export class Genre {

  public id: number;
  public name: string;
  public text: string;
  public icon: string;


  constructor(id: number, name: string, text: string, icon: string) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.icon = icon;
  }

  /**
   * Slugify the genre name
   * @returns {string}
   */
  public slug(): string {
    return slugify(this.name);
  }

  /**
   * Get the genre from its id
   * @param id {number} - The genre id
   * @returns {Genre | undefined}
   */
  public static fromId(id: number): Genre | undefined {
    return genres.find((genre) => genre.id === id);
  }

  /**
   * Get the genre from its slug
   * @param slug {string} - The genre slug
   * @returns {Genre | undefined}
   */
  public static fromSlug(slug: string): Genre | undefined {
    return genres.find((genre) => genre.slug() === slug);
  }

  public static fromIds(ids: number[]): Genre[] {
    return ids.map((id) => Genre.fromId(id) as Genre);
  }


}