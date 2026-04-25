evaluations = relationship(
    "LocationEvaluation",
    back_populates="location",
    cascade="all, delete-orphan"
)