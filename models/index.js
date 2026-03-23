const { dynamodb } = require("../utils/aws-helper");
const { v4: uuidv4 } = require("uuid");

// ⚠️ Table của bạn là Subjects (có S)
const tableName = "Subjects";

const SubjectModel = {

  // CREATE
  createSubject: async (subjectData) => {
    const subjectId = uuidv4();

    const params = {
      TableName: tableName,
      Item: {
        id: subjectId,
        name: subjectData.name,
        type: subjectData.type,
        semester: subjectData.semester,
        faculty: subjectData.faculty,
        image: subjectData.image,
      },
    };

    try {
      await dynamodb.put(params).promise();
      return params.Item;
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  // GET ALL
  getSubjects: async () => {
    const params = {
      TableName: tableName,
    };

    try {
      const data = await dynamodb.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error("Error getting subjects:", error);
      throw error;
    }
  },

  // GET ONE (theo id)
  getOneSubject: async (subjectId) => {
    const params = {
      TableName: tableName,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": subjectId,
      },
    };

    try {
      const data = await dynamodb.query(params).promise();
      return data.Items[0];
    } catch (error) {
      console.error("Error getting subject:", error);
      throw error;
    }
  },

  // UPDATE
  updateSubject: async (subjectId, name, subjectData) => {
    const params = {
      TableName: tableName,
      Key: {
        id: subjectId,
        name: name,
      },
      UpdateExpression:
        "set #t = :type, #s = :semester, #f = :faculty, #i = :image",
      ExpressionAttributeNames: {
        "#t": "type",
        "#s": "semester",
        "#f": "faculty",
        "#i": "image",
      },
      ExpressionAttributeValues: {
        ":type": subjectData.type,
        ":semester": subjectData.semester,
        ":faculty": subjectData.faculty,
        ":image": subjectData.image,
      },
      ReturnValues: "ALL_NEW",
    };

    try {
      const data = await dynamodb.update(params).promise();
      return data.Attributes;
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error;
    }
  },

  // DELETE
  deleteSubject: async (subjectId, name) => {
    const params = {
      TableName: tableName,
      Key: {
        id: subjectId,
        name: name,
      },
    };

    try {
      await dynamodb.delete(params).promise();
      return { id: subjectId };
    } catch (error) {
      console.error("Error deleting subject:", error);
      throw error;
    }
  },
};

module.exports = SubjectModel;