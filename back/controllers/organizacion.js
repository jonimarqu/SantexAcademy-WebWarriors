const { orgService } = require("../services");

const createOrganization = async (req, res) => {
  try {
    const newOrganization = await orgService.createOrganization(req.body);
    res.json(newOrganization);
  } catch (err) {
    res.status(500).json({ action: "createOrganization", error: err.message });
  }
};

const getOrganizations = async (req, res) => {
  try {
    const organizations = await orgService.getOrganizations();
    res.json(organizations);
  } catch (err) {
    res.status(500).json({ action: "getOrganizations", error: err.message });
  }
};

const updateOrganizationById = async (req, res) => {
  try {
    const organization = await orgService.updateOrganizationById(
      req.params.id,
      req.body
    );
    if (!organization) {
      res.status(404).json({
        action: "updateOrganizationById",
        error: "Organization not found",
      });
    }
    const organizationModified = await orgService.getOrganizationByCriteria({
      id: organization.id,
      nombre: organization.nombre,
      direccion: organization.direccion,
      telefono: organization.telefono,
      email: organization.email,
      cuit: organization.cuit,
      password: organization.password,
    });

    res.json(organizationModified);
  } catch (err) {
    res
      .status(500)
      .json({ action: "updateOrganizationById", error: err.message });
  }
};

const deleteOrganizationById = async (req, res) => {
  try {
    const organization = await orgService.deleteOrganizationById(req.params.id);
    if (!organization) {
      res.status(404).json({
        action: "deleteOrganizationById",
        error: "Organization not found",
      });
    }
    res.json(organization);
  } catch (err) {
    res
      .status(500)
      .json({ action: "deleteOrganizationById", error: err.message });
  }
};

// query parameters

// Se pasan req.query y req.body por que son los parametros que se pasan por la url y por el body
const getOrganizationByCriteria = async (req, res) => {
  try {
    const queryOptions = req.query;
    const bodyOptions = req.body;
    const organizations = await orgService.getOrganizationByCriteria(
      queryOptions,
      bodyOptions
    );
    res.json(organizations);
  } catch (err) {
    res.status(500).json({ action: "getUserByCriteria", error: err.message });
  }
};

const getOrganizationByLocation = async (req, res, next) => {
  try {
    const organizationFound = await orgService.getOrganizationByLocation(
      req.query.location,
      req.query.opportunityType
    );
    if (!organizationFound) {
      res
        .status(404)
        .json({ message: `No organization with the location ${req.query}` });
      return;
    }
    res.status(200).json({
      items: organizationFound.length,
      organizations: organizationFound,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
    next();
  }
};

module.exports = {
  getOrganizations,
  getOrganizationByCriteria,
  createOrganization,
  updateOrganizationById,
  deleteOrganizationById,
  getOrganizationByLocation,
};
