import conf from "../conf/conf";
import {
  Client,
  Databases,
  Storage,
  Query,
  ID,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        Permission.read(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: getPost() ::", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
        // Permission.read(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts() ::", error);
      return false;
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
        // Permission.write(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
        // Permission.update(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: updateDocument() ::", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        // Permission.delete(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: deleteDocument() ::", error);
      return false;
    }
  }

  //   Storage service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        Permission.write(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() ::", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        String(fileId)
        // Permission.delete(Role.any())
      );
    } catch (error) {
      console.log("Appwrite service :: deleteFile() ::", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId,parseInt(fileId))
      .href;
  }
}

const service = new Service();

export default service;
