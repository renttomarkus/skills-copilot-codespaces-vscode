function skillsMember() {
  const skills = this.skills;
  if (skills.length === 0) {
    return 'no skills';
  }
  return skills.join(', ');
}