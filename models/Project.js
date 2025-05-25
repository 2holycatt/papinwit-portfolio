const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    images: { type: [String] },
    techs: { type: [String] },
    gitHubLink: String,
    members: Number,
    myPosition: String,
    description: { type: String, required: true },
    internalUse: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
